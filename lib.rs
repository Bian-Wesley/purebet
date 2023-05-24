    let accounts_iter = &mut accounts.iter();

    //all instructions require these
    let usdc_bet_acc = next_account_info(accounts_iter)?;
    let token_program = next_account_info(accounts_iter)?;
    let source = next_account_info(accounts_iter)?;
    let mint = next_account_info(accounts_iter)?;
    let destination = next_account_info(accounts_iter)?;
    let authority = next_account_info(accounts_iter)?; //will be a signer sometimes
    
    let mut bet_acc = BetUsdc::try_from_slice(&usdc_bet_acc.data.borrow())?;


//start and full match
        else{
            let mut amount:u64 = 0;
            //match just needs to set wallets
            if instruction_data.len() == 0 {
                if bet_acc.wallet_home == all_zeroes {
                    amount = (bet_acc.home_usdc256 as u64 * 256 + bet_acc.home_usdc1s as u64) * 10000;
                    bet_acc.wallet_home = accounts[5].signer_key().unwrap().to_bytes();
                }
                else if bet_acc.wallet_away == all_zeroes {
                    amount = (bet_acc.away_usdc256 as u64 * 256 + bet_acc.away_usdc1s as u64) * 10000;
                    bet_acc.wallet_away = accounts[5].signer_key().unwrap().to_bytes();
                }
            }

let ix = spl_token::instruction::transfer_checked(
                    token_program.key,
                    source.key,
                    mint.key,
                    destination.key,
                    authority.key,
                    &[&authority.key],
                    amount as u64,
                    6,
                )?;
            invoke(
                &ix,
                &[source.clone(), mint.clone(), destination.clone(), authority.clone(), token_program.clone()],
            )?;
            bet_acc.serialize(&mut &mut usdc_bet_acc.data.borrow_mut()[..])?;
